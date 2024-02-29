using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Api.Model;
using TodoApp.Api.Model.Request;
using TodoApp.Api.Model.Response;

namespace TodoApp.Api.Endpoints;

public static class TodoEndpoints
{
    private static List<TodoItemDbModel> todoItems = [];
    
    public static WebApplication MapTodoEndpoints(this WebApplication app)
    {
        var chatGroup = app.MapGroup("/api/todos")
            .WithOpenApi();
        
        chatGroup.MapPost("/", CreateTodo)
            .WithName(nameof(CreateTodo));

        chatGroup.MapGet("/{id:guid}", GetTodo)
            .WithName(nameof(GetTodo));
        
        chatGroup.MapGet("/", GetTodos)
            .WithName(nameof(GetTodos));
        
        chatGroup.MapPut("/{id:guid}", UpdateTodo)
            .WithName(nameof(UpdateTodo));
        
        chatGroup.MapDelete("/{id:guid}", DeleteTodo)
            .WithName(nameof(DeleteTodo));
        
        return app;
    }
    
    public static async Task<CreatedAtRoute<TodoItemResponse>> CreateTodo(
        [FromBody] CreateTodoRequest request,
        [FromServices] IHttpContextAccessor httpContextAccessor)
    {
        var dbModel = new TodoItemDbModel(Guid.NewGuid(), request.Content, DateTimeOffset.UtcNow);
        
        todoItems.Add(dbModel);

        var response = new TodoItemResponse(dbModel.Id, dbModel.Content, dbModel.CreatedOn);
        
        return TypedResults.CreatedAtRoute(response, nameof(GetTodo), new { id = response.Id });
    }
    
    public static async Task<Results<Ok<TodoItemResponse>, NotFound<ProblemDetails>>> UpdateTodo(
        [FromRoute] Guid id,
        [FromBody] UpdateTodoRequest request,
        [FromServices] IHttpContextAccessor httpContextAccessor)
    {
        ArgumentNullException.ThrowIfNull(httpContextAccessor.HttpContext);

        var todo = todoItems.SingleOrDefault(x => x.Id == id);

        if (todo is null)
        {
            return TypedResults.NotFound(new ProblemDetails
            {
                Status = StatusCodes.Status404NotFound,
                Type = "NotFoundException",
                Title = "The requested entity could not be found",
                Detail = $"The item with id \"{id}\" could not be found",
                Instance = httpContextAccessor.HttpContext.Request.Path
            });
        }
        
        var updatedTodo = todo with { Id = todo.Id, Content = request.Content };
        todoItems.Remove(todo);
        todoItems.Add(updatedTodo);
            
        return TypedResults.Ok(new TodoItemResponse(todo.Id, todo.Content, todo.CreatedOn));
    }

    public static async Task<Ok<List<TodoItemResponse>>> GetTodos()
    {
        return TypedResults.Ok(todoItems
            .Select(x => new TodoItemResponse(x.Id, x.Content, x.CreatedOn))
            .ToList());
    }
    
    public static async Task<Results<Ok<TodoItemResponse>, NotFound<ProblemDetails>>> GetTodo(
        [FromRoute] Guid id,
        [FromServices] IHttpContextAccessor httpContextAccessor)
    {
        ArgumentNullException.ThrowIfNull(httpContextAccessor.HttpContext);

        var todo = todoItems.SingleOrDefault(x => x.Id == id);

        if (todo is null)
        {
            return TypedResults.NotFound(new ProblemDetails
            {
                Status = StatusCodes.Status404NotFound,
                Type = "NotFoundException",
                Title = "The requested entity could not be found",
                Detail = $"The item with id \"{id}\" could not be found",
                Instance = httpContextAccessor.HttpContext.Request.Path
            });
        }
            
        return TypedResults.Ok(new TodoItemResponse(todo.Id, todo.Content, todo.CreatedOn));
    }

    public static async Task<Results<NoContent, NotFound<ProblemDetails>>> DeleteTodo(
        [FromRoute] Guid id,
        [FromServices] IHttpContextAccessor httpContextAccessor)
    {
        ArgumentNullException.ThrowIfNull(httpContextAccessor.HttpContext);
        
        var todo = todoItems.SingleOrDefault(x => x.Id == id);

        if (todo is null)
        {
            return TypedResults.NotFound(new ProblemDetails
            {
                Status = StatusCodes.Status404NotFound,
                Type = "NotFoundException",
                Title = "The requested entity could not be found",
                Detail = $"The item with id \"{id}\" could not be found",
                Instance = httpContextAccessor.HttpContext.Request.Path
            });
        }
        todoItems.Remove(todo);

        return TypedResults.NoContent();
    }
}