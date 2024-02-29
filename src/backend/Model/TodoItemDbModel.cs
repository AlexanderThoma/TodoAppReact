namespace TodoApp.Api.Model;

public record TodoItemDbModel(Guid Id, string Content, DateTimeOffset CreatedOn);