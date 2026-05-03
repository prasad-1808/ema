
import { useCallback, useState } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface ImageUploadProps {
  onUpload: (files: File[]) => void;
  isUploading?: boolean;
}

export function ImageUpload({ onUpload, isUploading }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...files]);
    }
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []).filter((file) =>
        file.type.startsWith("image/")
      );

      if (files.length > 0) {
        setSelectedFiles((prev) => [...prev, ...files]);
      }
    },
    []
  );

  const removeFile = useCallback((index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleUpload = useCallback(() => {
    console.log("handleUpload called, selectedFiles:", selectedFiles.length);
    if (selectedFiles.length > 0) {
      console.log("Calling onUpload with files:", selectedFiles);
      onUpload(selectedFiles);
      setSelectedFiles([]);
    } else {
      console.log("No files selected");
    }
  }, [selectedFiles, onUpload]);

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-muted/30"
        )}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center gap-3">
          <div
            className={cn(
              "p-4 rounded-full transition-colors",
              isDragging ? "bg-primary/10" : "bg-muted"
            )}
          >
            <Upload
              className={cn(
                "h-8 w-8 transition-colors",
                isDragging ? "text-primary" : "text-muted-foreground"
              )}
            />
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">
              Drag & drop your photos here
            </p>
            <p className="text-sm text-muted-foreground">
              or click to browse files
            </p>
          </div>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">
              {selectedFiles.length} file{selectedFiles.length !== 1 && "s"}{" "}
              selected
            </p>
            <Button
              onClick={handleUpload}
              disabled={isUploading}
              size="sm"
              className="shadow-md"
            >
              {isUploading ? "Uploading..." : "Upload All"}
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="relative group aspect-square rounded-lg overflow-hidden bg-muted"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-foreground/80 text-background opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove file"
                >
                  <X className="h-3 w-3" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-foreground/60 to-transparent">
                  <p className="text-xs text-background truncate">{file.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedFiles.length === 0 && (
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
          <ImageIcon className="h-4 w-4" />
          <span>Supports JPG, PNG, GIF, and WebP</span>
        </div>
      )}
    </div>
  );
}
