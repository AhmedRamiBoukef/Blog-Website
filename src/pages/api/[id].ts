import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      const data = await prisma.post.findFirst({
        where: {
            id: req.query.id
        } 
      });
      res.status(200).json(data);
    } else if (req.method === "PUT") {
      const body = JSON.parse(req.body);
      const data = await prisma.post.update({
        where: {
            id: body.id
          },
        data: { title: body.title, body: body.body },
      });
      res.status(200).json(data);
    } else if (req.method === "DELETE") {
      const body = JSON.parse(req.body);
      console.log(body);
      
      const data = await prisma.post.delete({
        where: {
            id: body.id
          }
      });
      res.status(200).json(data);
    }
  } catch (e) {
    console.log(e);
    
    res.status(500).json(e);
  }
};

export default handler;
