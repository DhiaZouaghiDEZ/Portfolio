namespace PortfolioApp.Application.DTOs;

public class AgentQueryDTO
{
    public string Question { get; set; } = string.Empty;
}

public class AgentResponseDTO
{
    public string Answer { get; set; } = string.Empty;
    public bool Success { get; set; }
    public string? Error { get; set; }
}