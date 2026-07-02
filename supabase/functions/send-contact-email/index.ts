import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["a97732348@gmail.com"],
        subject: subject || `New Contact from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            <div style="padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
              <p><strong style="color: #555;">Name:</strong> ${name}</p>
              <p><strong style="color: #555;">Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong style="color: #555;">Subject:</strong> ${subject || "Not specified"}</p>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;" />
              <p><strong style="color: #555;">Message:</strong></p>
              <p style="background-color: #fff; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">
                ${message.replace(/\n/g, "<br/>")}
              </p>
            </div>
            <p style="color: #999; font-size: 12px; margin-top: 20px;">
              Sent from your Portfolio Contact Form
            </p>
          </div>
        `,
        reply_to: email,
      }),
    });

    const data = await emailResponse.json();

    if (!emailResponse.ok) {
      return new Response(JSON.stringify({ error: data }), {
        status: emailResponse.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
