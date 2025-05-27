import React from 'react';
import Protected from '@routes/Protected';

export function withAuth(Component) {
    return function AuthenticatedComponent(props) {
        return (
            <Protected>
                <Component {...props} />
            </Protected>
        );
    };
}