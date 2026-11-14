import OpenAI from "openai";
import { NextResponse } from "next/server";

type Action = "summarize" | "improve" | "explain";

// 1. Initialise OpenAI client here
const openai = new OpenAI();


// 2. Create POST handler
export async function POST(request: Request) {

  // 3. Read request body
  const body: unknown = await request.json();
  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  if (!("text" in body) || !("action" in body)) {
    return NextResponse.json(
      { error: "Request body must include both text and action" },
      { status: 400 }
    );
  }

  if (typeof body.text !== "string" || body.text.trim() === "") {
    return NextResponse.json(
      { error: "text must be a non-empty string" },
      { status: 400 }
    );
  }

  const supportedActions = ["summarize", "improve", "explain"] as const;
  if (typeof body.action !== "string" || !supportedActions.includes(body.action as typeof supportedActions[number])) {
    return NextResponse.json(
      { error: "action must be one of: summarize, improve, explain" },
      { status: 400 }
    );
  }

  if (
    typeof body.text !== "string" ||
    typeof body.action !== "string"
  ) {
    return NextResponse.json(
      { error: "Invalid text or action type" },
      { status: 400 }
    );
  }

  function isAction(value: string): value is Action {
    return ["summarize", "improve", "explain"].includes(value);
  }

  // 4. Extract text and action
  console.log(body)

  // 5. Send request to OpenAI


  // 6. Return the generated response
  return NextResponse.json({
    message: "Request received",
    data: body,
  });

}