export async function authMiddleware(req: any, reply: any) {
  const { email } = req.headers;
  if (!email) {
    return reply.code(401).send({ error: "Unauthorized" });
  }
}
