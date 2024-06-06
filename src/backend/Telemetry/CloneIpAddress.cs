using Microsoft.ApplicationInsights.Channel;
using Microsoft.ApplicationInsights.DataContracts;
using Microsoft.ApplicationInsights.Extensibility;
using Serilog;

namespace TodoApp.Api.Telemetry;

public class CloneIpAddress : ITelemetryInitializer
{
    public void Initialize(ITelemetry telemetry)
    {
        if (telemetry is ISupportProperties propTelemetry && !propTelemetry.Properties.ContainsKey("client-ip"))
        {
            var clientIpValue = telemetry.Context.Location.Ip;
            
            Log.Information("Client IP in CloneIpAddress class: {ClientIp}", clientIpValue);
            
            propTelemetry.Properties.Add("client-ip", clientIpValue);
        }
    }
}