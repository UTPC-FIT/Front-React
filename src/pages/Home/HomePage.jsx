import React from 'react'
import Button from '../../components/atoms/Button'

export default function HomePage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">Bienvenido a Home</h1>
            <Button
                variant="primary"
                size="medium"
                onClick={() => console.log('Button clicked')}
                disabled={false}
                className="mt-4"
            >
                Click me
            </Button>
        </div>
    )
}
