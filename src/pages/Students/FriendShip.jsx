import React, { useState, useEffect } from 'react';
import { useAuth } from '@context/AuthContext';
import FriendshipService from '../../services/friendshipService';
import { toast } from 'react-toastify';

// Importar todos los componentes necesarios:
import HeaderTemplate from '@templates/HeaderTemplate';
import Footer from '@molecules/footers/Footer';
import TitleWithIcon from '@molecules/TitleWithIcon';
import Text from '@atoms/Text';
import InputWithLabel from '@molecules/InputWithLabel';
import ButtonWithIcon from '@molecules/ButtonWithIcon';
import Button from '@atoms/Button';
import Search from '@organisms/Search';
import Pagination from '@organisms/Pagination';
import ErrorDisplay from '@molecules/ErrorDisplay';
import ConfirmationModal from '@molecules/ConfirmationModal';

import { FaUserFriends } from 'react-icons/fa';



const FriendShip = () => {
    const { user } = useAuth();
    const [friends, setFriends] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newFriendId, setNewFriendId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [actionType, setActionType] = useState(''); // 'accept' or 'reject'
    const [globalRanking, setGlobalRanking] = useState([]);
    const [activeTab, setActiveTab] = useState('friends'); // 'friends', 'requests', 'ranking'

    const itemsPerPage = 10;

    useEffect(() => {
        if (user?.id_student) {
            loadFriends();
            loadPendingRequests();
            loadGlobalRanking();
        }
    }, [user]);

    const loadFriends = async () => {
        try {
            setLoading(true);
            const friendsData = await FriendshipService.getFriends(user.id_student);
            setFriends(friendsData);
        } catch (err) {
            setError('Error al cargar amigos');
            toast.error('Error al cargar la lista de amigos');
        } finally {
            setLoading(false);
        }
    };

    const loadPendingRequests = async () => {
        try {
            const requestsData = await FriendshipService.getPendingRequests(user.id_student);
            setPendingRequests(requestsData);
        } catch (err) {
            console.warn('Error al cargar solicitudes pendientes:', err);
        }
    };

    const loadGlobalRanking = async () => {
        try {
            const rankingData = await FriendshipService.getGlobalRanking(10);
            setGlobalRanking(rankingData);
        } catch (err) {
            console.warn('Error al cargar ranking global:', err);
        }
    };

    const handleSendFriendRequest = async () => {
        if (!newFriendId.trim()) {
            toast.error('Por favor ingresa el ID del estudiante');
            return;
        }

        if (newFriendId === user.id_student) {
            toast.error('No puedes enviarte una solicitud a ti mismo');
            return;
        }

        try {
            setLoading(true);
            await FriendshipService.sendFriendRequest(user.id_student, newFriendId);
            toast.success('Solicitud de amistad enviada exitosamente');
            setNewFriendId('');
        } catch (err) {
            setError('Error al enviar solicitud de amistad');
            toast.error(err.message || 'Error al enviar la solicitud');
        } finally {
            setLoading(false);
        }
    };

    const handleAcceptRequest = async (requestId) => {
        try {
            setLoading(true);
            await FriendshipService.acceptFriendRequest(requestId);
            toast.success('Solicitud de amistad aceptada');
            
            // Recargar datos
            await loadFriends();
            await loadPendingRequests();
        } catch (err) {
            setError('Error al aceptar solicitud');
            toast.error(err.message || 'Error al aceptar la solicitud');
        } finally {
            setLoading(false);
        }
    };

    const handleRejectRequest = async (requestId) => {
        try {
            setLoading(true);
            await FriendshipService.rejectFriendRequest(requestId);
            toast.success('Solicitud de amistad rechazada');
            
            // Recargar solicitudes pendientes
            await loadPendingRequests();
        } catch (err) {
            setError('Error al rechazar solicitud');
            toast.error(err.message || 'Error al rechazar la solicitud');
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmAction = () => {
        if (actionType === 'accept') {
            handleAcceptRequest(selectedRequest.id);
        } else if (actionType === 'reject') {
            handleRejectRequest(selectedRequest.id);
        }
        
        // Cerrar modal
        setShowConfirmModal(false);
        setSelectedRequest(null);
        setActionType('');
    };

    const filteredFriends = friends.filter(friendData =>
        friendData.friend.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        friendData.friend.id?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedFriends = filteredFriends.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredFriends.length / itemsPerPage);

    const menu = [
        { name: 'Inicio', href: '/students' },
        { name: 'Asignar Turno', href: '/students/schedule' },
        { name: 'Amistades', href: '/students/friendship' },
    ];

    if (loading && friends.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
                    <Text>Cargando amistades...</Text>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-neutral-white">
            <HeaderTemplate menu={menu} />
            
            <div className="flex-grow container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                        <div className="mb-8">
                        <TitleWithIcon IconComponent={FaUserFriends}>
                            Sistema de Amistades
                        </TitleWithIcon>
                        <p className="text-gray-600 mt-2">
                            Conecta con otros estudiantes y mantén tus rachas de asistencia
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="mb-6">
                        <nav className="flex space-x-8">
                            {[
                                { id: 'friends', label: 'Mis Amigos', count: friends.length },
                                { id: 'requests', label: 'Solicitudes', count: pendingRequests.length },
                                { id: 'ranking', label: 'Ranking Global', count: globalRanking.length }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === tab.id
                                            ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    {tab.label}
                                    {tab.count > 0 && (
                                        <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                                            {tab.count}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Content based on active tab */}
                    {activeTab === 'friends' && (
                        <div className="space-y-6">
                            {/* Send Friend Request */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold mb-4">Enviar Solicitud de Amistad</h3>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <InputWithLabel
                                            label="ID del Estudiante"
                                            placeholder="Ingresa el ID del estudiante"
                                            value={newFriendId}
                                            onChange={(e) => setNewFriendId(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <ButtonWithIcon
                                            onClick={handleSendFriendRequest}
                                            disabled={loading || !newFriendId.trim()}
                                            variant="primary"
                                        >
                                            Enviar Solicitud
                                        </ButtonWithIcon>
                                    </div>
                                </div>
                            </div>

                            {/* Search */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <Search
                                    value={searchTerm}
                                    onSearch={setSearchTerm}
                                />
                            </div>

                            {/* Friends List */}
                            <div className="bg-white rounded-lg shadow-md">
                                {paginatedFriends.length === 0 ? (
                                    <div className="p-8 text-center">
                                        <Text className="text-gray-500">
                                            {searchTerm ? 'No se encontraron amigos con ese criterio' : 'Aún no tienes amigos agregados'}
                                        </Text>
                                    </div>
                                ) : (
                                    <div className="overflow-hidden">
                                        <div className="divide-y divide-gray-200">
                                            {paginatedFriends.map((friendData) => (
                                                <div key={friendData.friend.id} className="p-6">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="flex-shrink-0 h-12 w-12 bg-[var(--color-primary-light)] rounded-full flex items-center justify-center">
                                                                <Text className="text-[var(--color-primary)] font-semibold">
                                                                    {friendData.friend.name?.charAt(0) || 'U'}
                                                                </Text>
                                                            </div>
                                                            <div>
                                                                <Text className="font-semibold">{friendData.friend.name || 'Usuario'}</Text>
                                                                <Text className="text-sm text-gray-500">{friendData.friend.id}</Text>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="flex items-center space-x-2">
                                                                <Text className="text-sm font-medium">Racha:</Text>
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                                    🔥 {friendData.friendship?.streak_count || 0} días
                                                                </span>
                                                            </div>
                                                            {friendData.friendship?.last_attendance_date && (
                                                                <Text className="text-xs text-gray-400 mt-1">
                                                                    Última asistencia: {new Date(friendData.friendship.last_attendance_date).toLocaleDateString()}
                                                                </Text>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {totalPages > 1 && (
                                    <div className="px-6 py-4 border-t border-gray-200">
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={setCurrentPage}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'requests' && (
                        <div className="bg-white rounded-lg shadow-md">
                            {pendingRequests.length === 0 ? (
                                <div className="p-8 text-center">
                                    <Text className="text-gray-500">No tienes solicitudes pendientes</Text>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-200">
                                    {pendingRequests.map((request) => (
                                        <div key={request.id} className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <Text className="text-blue-600 font-semibold">
                                                            {request.sender?.name?.charAt(0) || 'U'}
                                                        </Text>
                                                    </div>
                                                    <div>
                                                        <Text className="font-semibold">{request.sender?.name || 'Usuario'}</Text>
                                                        <Text className="text-sm text-gray-500">{request.sender?.email}</Text>
                                                        <Text className="text-xs text-gray-400">
                                                            Enviada: {new Date(request.created_at).toLocaleDateString()}
                                                        </Text>
                                                    </div>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <Button
                                                        onClick={() => {
                                                            setSelectedRequest(request);
                                                            setActionType('accept');
                                                            setShowConfirmModal(true);
                                                        }}
                                                        variant="primary"
                                                        size="sm"
                                                    >
                                                        Aceptar
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            setSelectedRequest(request);
                                                            setActionType('reject');
                                                            setShowConfirmModal(true);
                                                        }}
                                                        variant="secondary"
                                                        size="sm"
                                                    >
                                                        Rechazar
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'ranking' && (
                        <div className="bg-white rounded-lg shadow-md">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-semibold">🏆 Ranking Global de Rachas</h3>
                                <Text className="text-sm text-gray-500">Las mejores rachas de asistencia entre amigos</Text>
                            </div>
                            {globalRanking.length === 0 ? (
                                <div className="p-8 text-center">
                                    <Text className="text-gray-500">No hay rachas registradas aún</Text>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-200">
                                    {globalRanking.map((rank, index) => (
                                        <div key={rank.friendship_id} className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                                                        <Text className="font-bold text-yellow-600">#{index + 1}</Text>
                                                    </div>
                                                    <div>
                                                        <Text className="font-semibold">
                                                            {rank.student1_name} & {rank.student2_name}
                                                        </Text>
                                                        <Text className="text-sm text-gray-500">
                                                            IDs: {rank.student1_id} - {rank.student2_id}
                                                        </Text>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                                        🔥 {rank.streak_count} días
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {error && (
                        <ErrorDisplay 
                            message={error} 
                            onRetry={() => {
                                setError(null);
                                loadFriends();
                                loadPendingRequests();
                                loadGlobalRanking();
                            }} 
                        />
                    )}
                </div>
            </div>

            <Footer />

            {/* Confirmation Modal */}
            {showConfirmModal && selectedRequest && (
                <ConfirmationModal
                    title={actionType === 'accept' ? 'Aceptar Solicitud' : 'Rechazar Solicitud'}
                    message={
                        actionType === 'accept'
                            ? `¿Estás seguro de que quieres aceptar la solicitud de amistad de ${selectedRequest.sender?.name}?`
                            : `¿Estás seguro de que quieres rechazar la solicitud de amistad de ${selectedRequest.sender?.name}?`
                    }
                    onConfirm={handleConfirmAction}
                    onCancel={() => {
                        setShowConfirmModal(false);
                        setSelectedRequest(null);
                        setActionType('');
                    }}
                />
            )}
        </div>
    );
};

export default FriendShip;
