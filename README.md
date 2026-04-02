# @pipeworx/mcp-bible

MCP server for [bible-api.com](https://bible-api.com) — look up verses by reference, retrieve passages in multiple translations, and get random verses. Free, no auth required.

## Tools

| Tool | Description |
|------|-------------|
| `get_verse` | Fetch a verse or verse range by reference (WEB translation) |
| `get_passage` | Fetch a passage with a specific translation (KJV, WEB, etc.) |
| `random_verse` | Fetch a random Bible verse |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "bible": {
      "type": "url",
      "url": "https://gateway.pipeworx.io/bible"
    }
  }
}
```

## CLI Usage

```bash
npx @anthropic-ai/mcp-client https://gateway.pipeworx.io/bible
```

## License

MIT
