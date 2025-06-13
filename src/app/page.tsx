export const dynamic = 'force-dynamic'
import getUserFromToken from "@/lib/auth";

export default async function HomePage() {

    try {

        const user = await getUserFromToken();

        return (
            <>
                {/*@ts-ignore*/}
                <h2> {user && 'Welcome '+ user.name}</h2>
                {/*@ts-ignore*/}
                <h2> {user && 'You are a ' + user.role}</h2>

                <h3>{!user && 'Welcome to SCMS. Society-Complaint-Management-System. This was made as a part of 3-day Hackathon conducted by the official web team of NIT JSR. Kindly register and login and give your review. Till now basic UI has been made.'}</h3>
            </>
        )
    } catch (e) {
        console.error("Error fetching user:", e);
        return <div>Error loading user data</div>;
    }

}

