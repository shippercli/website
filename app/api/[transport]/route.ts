import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';

const handler = createMcpHandler(
  server => {
    server.registerTool(
      'roll_dice',
      {
        description: 'Rolls an N-sided die',
        inputSchema: z.object({ sides: z.number().int().min(2).max(Number.MAX_SAFE_INTEGER) }),
      },
      async ({ sides }) => {
        const value = 1 + Math.floor(Math.random() * sides);
        return {
          content: [{ type: 'text', text: `🎲 You rolled a ${value}!` }],
        };
      }
    );
  },
  {
    verboseLogs: false,
  }
);

export { handler as GET, handler as POST };
