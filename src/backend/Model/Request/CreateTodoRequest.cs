namespace TodoApp.Api.Model.Request;

public record CreateTodoRequest(
    string Title,
    string Content);