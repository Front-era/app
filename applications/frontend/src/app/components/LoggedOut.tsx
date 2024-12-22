import React from 'react';

/**
 * A functional React component that displays a message prompting the user to log in.
 * 
 * This component uses Tailwind CSS for styling and centers the message both vertically
 * and horizontally on the screen.
 * 
 * @returns A JSX element containing a div with a centered message.
 */
const LoggedOut: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-800">Log in to continue</h1>
        </div>
    );
};

export default LoggedOut;