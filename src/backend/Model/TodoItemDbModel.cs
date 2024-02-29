namespace TodoApp.Api.Model;

public record TodoItemDbModel(Guid Id, string Title, string Content, DateTimeOffset CreatedOn);