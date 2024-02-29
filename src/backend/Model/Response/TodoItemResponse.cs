namespace TodoApp.Api.Model.Response;

public record TodoItemResponse(Guid Id, string Content, DateTimeOffset CreatedOn);