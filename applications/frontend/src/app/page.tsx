'use client'
import { useUser } from "@clerk/nextjs"
import { SignOutButton } from "@clerk/nextjs";
import axios from "axios";

interface UserObject {
    userId: string;
    createdAt: string;
    lastSignInAt: string;
    firstName: string;
    lastName: string;
    fullName: string;
    imageUrl: string;
    email: string;
    phoneNumber: string;
}

export default function Home() {
    const { user } = useUser();

    if (!user) {
        console.log("Not logged in");
    }

    const firstName = user?.firstName || "Explorer"; // This will be replaced with actual auth later

    const createUser = async (userObj:UserObject) => {
        console.log("User Object => " + JSON.stringify(userObj));
        try {
            const response = await axios.post("http://localhost:3000/users",{
                userId: userObj.userId,
                email: userObj.email,
                firstName: userObj.firstName,
                lastName: userObj.lastName,
                fullName: userObj.fullName,
                imageUrl: userObj.imageUrl,
                phoneNumber: userObj.phoneNumber,
                colonyId: "yourColonyIdHere",  // You still need to provide colonyId
                lastSigninAt: new Date(userObj.lastSignInAt),
            });
            console.log('User created:', response.status);
        } catch (error) {
            console.error('Error sending user data to backend:', error);
        }
    };

    if (user) {
        console.log(user.id);
        console.log(user.createdAt);
        console.log(user.lastSignInAt);
        console.log(user.firstName);
        console.log(user.lastName);
        console.log(user.fullName);
        console.log(user.hasImage ? user.imageUrl : "No image");
        console.log(user.primaryEmailAddress);
        console.log(user.hasVerifiedPhoneNumber ? user.phoneNumbers : "Has no phone");

        const userObj: UserObject = {
            userId: user.id,
            createdAt: user.createdAt ? user.createdAt.toISOString() : "",  
            lastSignInAt: user.lastSignInAt ? user.lastSignInAt.toISOString() : "",  
            firstName: user.firstName || "", 
            lastName: user.lastName || "",  
            fullName: user.fullName || "",  
            imageUrl: user.hasImage ? user.imageUrl : "No image",
            email: user.primaryEmailAddress?.toString() || "",  
            phoneNumber: user.hasVerifiedPhoneNumber ? user.phoneNumbers.toString() : "Has no phone",  
        };

        console.log(userObj);
        createUser(userObj); 
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <h1>{firstName}</h1>
            <SignOutButton>Signout</SignOutButton>
        </div>
    );
}
