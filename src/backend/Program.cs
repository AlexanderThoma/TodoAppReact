using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Serilog;
using TodoApp.Api.Endpoints;
using TodoApp.Api.Telemetry;

const string myAllowSpecificOrigins = "disable cors";

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((_, configureLogger)
    => configureLogger.ReadFrom.Configuration(builder.Configuration));


/*builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)  
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));
builder.Services.AddRequiredScopeAuthorization();

builder.Services.AddAuthorizationBuilder()
    .AddDefaultPolicy("access_as_user_policy", policy =>
    {
        // Validate if the scope 'access_as_user' was added  
        policy.RequireScope("access_as_user");

        // Validate id of application for which the token was created  
        // The client app (frontend app) id should be the same as the one in the token
        // https://learn.microsoft.com/en-us/entra/identity-platform/access-token-claims-reference#payload-claims
        policy.RequireClaim("azp", builder.Configuration["Policy:ClientId"]!);
    });*/

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();
builder.Services.AddCors(options =>
{
    options.AddPolicy(myAllowSpecificOrigins,
        policy =>
        {
            policy
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddHealthChecks().AddCheck("self", () => HealthCheckResult.Healthy());
builder.Services.AddSingleton<ITelemetryInitializer, CloneIpAddress>();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(myAllowSpecificOrigins);

app.MapTodoEndpoints();

app.MapHealthChecks("api/health")
    .AllowAnonymous();

app.Run();