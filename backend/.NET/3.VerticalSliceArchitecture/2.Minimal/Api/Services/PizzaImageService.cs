namespace Api.Services;

using System.Collections.Concurrent;
using System.Net.Mime;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.StaticFiles;

public sealed record PizzaImageDefinition(byte[] content, string mediaType, string fileName, string eTag, DateTime lastModified);

public sealed class PizzaImageService
{
    private const string DefaultFileName = "hawaiian.png";

    private static readonly IReadOnlyDictionary<int, string> ImageFileNames = new Dictionary<int, string>
    {
        [1] = "margherita.png",
        [2] = "pepperoni.png",
        [3] = "regina.png",
        [4] = "hawaiian.png",
        [5] = "logo.png",
    };

    private readonly string imagesDirectory;
    private readonly FileExtensionContentTypeProvider contentTypeProvider = new();
    private readonly ConcurrentDictionary<string, PizzaImageDefinition?> cache = new(StringComparer.OrdinalIgnoreCase);

    public PizzaImageService(IWebHostEnvironment environment)
    {
        var rootPath = environment.ContentRootPath ?? AppContext.BaseDirectory ?? Environment.CurrentDirectory;
        this.imagesDirectory = Path.Combine(rootPath, "wwwroot", "images");
        Directory.CreateDirectory(this.imagesDirectory);
    }

    public PizzaImageDefinition? GetImage(int pizzaId)
    {
        var fileName = ImageFileNames.TryGetValue(pizzaId, out var mapped) ? mapped : DefaultFileName;
        return this.cache.GetOrAdd(fileName, this.LoadImageDefinition);
    }

    private static string CreateETag(FileInfo fileInfo)
        => $"\"{fileInfo.Length}-{fileInfo.LastWriteTimeUtc.Ticks}\"";

    private PizzaImageDefinition? LoadImageDefinition(string fileName)
    {
        var filePath = Path.Combine(this.imagesDirectory, fileName);
        if (!File.Exists(filePath))
        {
            return null;  // Return null for missing images
        }

        var fileInfo = new FileInfo(filePath);
        var content = File.ReadAllBytes(filePath);
        var mediaType = this.contentTypeProvider.TryGetContentType(filePath, out var detectedType)
            ? detectedType
            : MediaTypeNames.Application.Octet;
        var etag = CreateETag(fileInfo);

        return new PizzaImageDefinition(content, mediaType, fileInfo.Name, etag, fileInfo.LastWriteTimeUtc);
    }
}
