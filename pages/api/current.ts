// import serverAuth from "@/libs/serverAuth";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req:NextApiRequest, res:NextApiResponse) {
//     if (req.method !== 'GET') {
//         return res.status(405).end();
//     }

//     try {
//         const {currentUser} = await serverAuth(req);
//         return res.status (200).json(currentUser);
//     } catch (error) {
//         console.log (error);
//         return res.status(400).end();  
//     }  
// }

import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("Handler entered"); // Logging

    if (req.method !== 'GET') {
        console.log("Not a GET request");
        return res.status(405).end();
    }

    try {
        const {currentUser} = await serverAuth(req);
        console.log("Sending user data:", currentUser);
        return res.status(200).json(currentUser);
    } catch (error) {
        console.log("Error from serverAuth:", error);
        return res.status(400).json({ error: "Error processing the request." });
    }
}
