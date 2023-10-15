import { NextApiRequest, NextApiResponse } from 'next'
import React from 'react'
import prisma from '@/libs/prismadb';
import { tr } from 'date-fns/locale';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method!=='GET'){
        return res.status(405).end();
    }
    
    try {
        const {postId} = req.query;

        if(!postId || typeof postId !== 'string'){
            throw new Error('Ivalid ID');
        }
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                user:true,
                comments: {
                    include : {
                        user:true
                    },
                    orderBy: {
                        createdAt:'desc'
                    }
                }
            },

            }
        });
        
    } catch (error) {
        console.log(error);
        return res.status(400).end();        
    }

  return (
    <div></div>
  )
}
