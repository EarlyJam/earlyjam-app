#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { spawn } from "child_process";

class VercelMCPServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: "vercel-mcp-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "vercel_deploy",
            description: "Deploy the current project to Vercel",
            inputSchema: {
              type: "object",
              properties: {
                environment: {
                  type: "string",
                  enum: ["production", "preview"],
                  description: "Deployment environment",
                  default: "preview",
                },
                message: {
                  type: "string",
                  description: "Deployment message",
                },
              },
            },
          },
          {
            name: "vercel_status",
            description: "Get the current deployment status",
            inputSchema: {
              type: "object",
              properties: {},
            },
          },
          {
            name: "vercel_logs",
            description: "Get deployment logs",
            inputSchema: {
              type: "object",
              properties: {
                deploymentId: {
                  type: "string",
                  description: "Deployment ID to get logs for",
                },
              },
            },
          },
          {
            name: "vercel_projects",
            description: "List all Vercel projects",
            inputSchema: {
              type: "object",
              properties: {},
            },
          },
          {
            name: "vercel_domains",
            description: "List domains for the current project",
            inputSchema: {
              type: "object",
              properties: {},
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        let result;
        switch (name) {
          case "vercel_deploy":
            result = await this.deployToVercel(args);
            break;
          case "vercel_status":
            result = await this.getDeploymentStatus();
            break;
          case "vercel_logs":
            result = await this.getDeploymentLogs(args);
            break;
          case "vercel_projects":
            result = await this.listProjects();
            break;
          case "vercel_domains":
            result = await this.listDomains();
            break;
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
        // Ensure result is always an object
        return result ?? { content: [{ type: "text", text: "No result" }] };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    });
  }

  private async deployToVercel(args: any) {
    const { environment = "preview", message } = args;
    
    return new Promise((resolve, reject) => {
      const vercel = spawn("vercel", [
        "--yes",
        environment === "production" ? "--prod" : "",
        message ? `--message=${message}` : "",
      ].filter(Boolean), {
        stdio: ["pipe", "pipe", "pipe"],
      });

      let output = "";
      let errorOutput = "";

      vercel.stdout?.on("data", (data) => {
        output += data.toString();
      });

      vercel.stderr?.on("data", (data) => {
        errorOutput += data.toString();
      });

      vercel.on("close", (code) => {
        if (code === 0) {
          resolve({
            content: [
              {
                type: "text",
                text: `Deployment successful!\n\nOutput:\n${output}`,
              },
            ],
          });
        } else {
          reject(new Error(`Deployment failed with code ${code}:\n${errorOutput}`));
        }
      });
    });
  }

  private async getDeploymentStatus() {
    return new Promise((resolve, reject) => {
      const vercel = spawn("vercel", ["ls"], {
        stdio: ["pipe", "pipe", "pipe"],
      });

      let output = "";

      vercel.stdout?.on("data", (data) => {
        output += data.toString();
      });

      vercel.on("close", (code) => {
        if (code === 0) {
          resolve({
            content: [
              {
                type: "text",
                text: `Deployment Status:\n${output}`,
              },
            ],
          });
        } else {
          reject(new Error(`Failed to get deployment status`));
        }
      });
    });
  }

  private async getDeploymentLogs(args: any) {
    const { deploymentId } = args;
    
    if (!deploymentId) {
      return {
        content: [
          {
            type: "text",
            text: "Error: deploymentId is required",
          },
        ],
      };
    }

    return new Promise((resolve, reject) => {
      const vercel = spawn("vercel", ["logs", deploymentId], {
        stdio: ["pipe", "pipe", "pipe"],
      });

      let output = "";

      vercel.stdout?.on("data", (data) => {
        output += data.toString();
      });

      vercel.on("close", (code) => {
        if (code === 0) {
          resolve({
            content: [
              {
                type: "text",
                text: `Deployment Logs for ${deploymentId}:\n${output}`,
              },
            ],
          });
        } else {
          reject(new Error(`Failed to get deployment logs`));
        }
      });
    });
  }

  private async listProjects() {
    return new Promise((resolve, reject) => {
      const vercel = spawn("vercel", ["projects", "ls"], {
        stdio: ["pipe", "pipe", "pipe"],
      });

      let output = "";

      vercel.stdout?.on("data", (data) => {
        output += data.toString();
      });

      vercel.on("close", (code) => {
        if (code === 0) {
          resolve({
            content: [
              {
                type: "text",
                text: `Vercel Projects:\n${output}`,
              },
            ],
          });
        } else {
          reject(new Error(`Failed to list projects`));
        }
      });
    });
  }

  private async listDomains() {
    return new Promise((resolve, reject) => {
      const vercel = spawn("vercel", ["domains", "ls"], {
        stdio: ["pipe", "pipe", "pipe"],
      });

      let output = "";

      vercel.stdout?.on("data", (data) => {
        output += data.toString();
      });

      vercel.on("close", (code) => {
        if (code === 0) {
          resolve({
            content: [
              {
                type: "text",
                text: `Project Domains:\n${output}`,
              },
            ],
          });
        } else {
          reject(new Error(`Failed to list domains`));
        }
      });
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Vercel MCP server running on stdio");
  }
}

const server = new VercelMCPServer();
server.run().catch(console.error); 