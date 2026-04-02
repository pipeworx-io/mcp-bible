/**
 * Bible MCP — wraps the Bible API (free, no auth)
 * https://bible-api.com
 *
 * Tools:
 * - get_verse: fetch a specific Bible verse or verse range by reference
 * - get_passage: fetch a passage with a specific translation
 * - random_verse: fetch a random Bible verse
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://bible-api.com';

const tools: McpToolExport['tools'] = [
  {
    name: 'get_verse',
    description:
      'Fetch a specific Bible verse or verse range by reference (e.g. "john 3:16", "romans 8:28", "psalm 23:1-6"). Returns the verse text in the World English Bible (WEB) translation.',
    inputSchema: {
      type: 'object',
      properties: {
        reference: {
          type: 'string',
          description:
            'Bible reference string (e.g. "john 3:16", "genesis 1:1-3", "psalm 23"). Spaces will be encoded automatically.',
        },
      },
      required: ['reference'],
    },
  },
  {
    name: 'get_passage',
    description:
      'Fetch a Bible passage with a specified translation. Supported translations: web (World English Bible), kjv (King James Version), oeb-us, bbe, webbe, cherokee, dra.',
    inputSchema: {
      type: 'object',
      properties: {
        reference: {
          type: 'string',
          description: 'Bible reference string (e.g. "john 3:16", "genesis 1:1-5")',
        },
        translation: {
          type: 'string',
          description:
            'Translation code: "web" (default), "kjv", "oeb-us", "bbe", "webbe", "cherokee", "dra"',
        },
      },
      required: ['reference', 'translation'],
    },
  },
  {
    name: 'random_verse',
    description:
      'Fetch a random Bible verse. Returns the reference, text, and translation.',
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'get_verse':
      return getVerse(args.reference as string);
    case 'get_passage':
      return getPassage(args.reference as string, args.translation as string);
    case 'random_verse':
      return randomVerse();
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

interface BibleApiResponse {
  reference: string;
  text: string;
  translation_id: string;
  translation_name: string;
  verses: Array<{
    book_id: string;
    book_name: string;
    chapter: number;
    verse: number;
    text: string;
  }>;
}

function formatResponse(data: BibleApiResponse) {
  return {
    reference: data.reference,
    translation: data.translation_id,
    translation_name: data.translation_name,
    text: data.text.trim(),
    verses: data.verses.map((v) => ({
      book: v.book_name,
      chapter: v.chapter,
      verse: v.verse,
      text: v.text.trim(),
    })),
  };
}

async function getVerse(reference: string) {
  const encodedRef = encodeURIComponent(reference);
  const res = await fetch(`${BASE_URL}/${encodedRef}`);
  if (!res.ok) throw new Error(`Bible API error: ${res.status}`);

  const data = (await res.json()) as BibleApiResponse;
  return formatResponse(data);
}

async function getPassage(reference: string, translation: string) {
  const encodedRef = encodeURIComponent(reference);
  const params = new URLSearchParams({ translation });

  const res = await fetch(`${BASE_URL}/${encodedRef}?${params}`);
  if (!res.ok) throw new Error(`Bible API error: ${res.status}`);

  const data = (await res.json()) as BibleApiResponse;
  return formatResponse(data);
}

async function randomVerse() {
  const res = await fetch(`${BASE_URL}/?random=verse`);
  if (!res.ok) throw new Error(`Bible API error: ${res.status}`);

  const data = (await res.json()) as BibleApiResponse;
  return formatResponse(data);
}

export default { tools, callTool } satisfies McpToolExport;
