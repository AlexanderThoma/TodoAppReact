namespace TodoApp.Api.Model.Response;

public record TodoItemResponse(Guid Id, string Title, string Content, DateTimeOffset CreatedOn);