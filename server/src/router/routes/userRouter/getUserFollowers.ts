import { z } from "zod";
import { protectedProcedure } from "../../../trpc/trpc";

export const getUserFollowers = protectedProcedure
  .input(z.object({ username: z.string() }))
  .query(async ({ ctx, input }) => {
    let userFollowers = await ctx.prisma.user.findUnique({
      where: { username: input.username },
      include: {
        following: {
          include: {
            follower: {
              select: {
                bio: true,
                username: true,
                name: true,
                profileImage: true,
                badge: true,
              },
            },
          },
        },
        followers: {
          include: {
            following: {
              select: {
                bio: true,
                username: true,
                name: true,
                profileImage: true,
                badge: true,
              },
            },
          },
        },
      },
    });
    console.log("userFollowers", userFollowers);
    return { success: true, userFollowers };
  });