namespace Api;

using Utilities.CQRS;

[ApiController]
[Route("[controller]")]
[Produces("application/json")]
public class ApiBaseController : ControllerBase
{
    private Dispatcher dispatcher;

    public Dispatcher Dispatcher => this.dispatcher ??= this.HttpContext.RequestServices.GetService<Dispatcher>();
}
