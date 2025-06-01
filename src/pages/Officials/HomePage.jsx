import FullScreenCardTemplate from '@templates/FullScreenCardTemplate'
import TableStudentsHeader from '@organisms/headers/TableStudentsHeader'
import TableStudentsTemplate from '@templates/TableStudentsTemplate';

const HomePage = () => {

    return (
        <FullScreenCardTemplate
            backgroundScreenColor='bg-[var(--color-background-dark)]'
            backgroundColor='bg-[var(--color-background-light)]'
            className="flex flex-col gap-8"
            largeWidth="90%"
        >
            <TableStudentsHeader />
            <TableStudentsTemplate />

        </FullScreenCardTemplate>
    );
};

export default HomePage;