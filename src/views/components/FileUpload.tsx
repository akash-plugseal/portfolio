import { useState, useRef } from 'react';
import type { DragEvent } from 'react';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import './FileUpload.css';

interface FileUploadProps {
  accept?: string;
  onFileSelect: (file: File) => Promise<void>;
  onFileRemove?: () => void;
  currentFileName?: string;
  disabled?: boolean;
  uploading?: boolean;
}

const FileUpload = ({ 
  accept = '.pdf', 
  onFileSelect, 
  onFileRemove, 
  currentFileName,
  disabled = false,
  uploading = false
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !uploading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled || uploading) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    const ext = accept.replace('.', '').toLowerCase();
    if (!file.name.toLowerCase().endsWith(`.${ext}`)) {
      alert(`Please select a ${accept.toUpperCase()} file`);
      return;
    }

    setSelectedFile(file);
    setUploadSuccess(false);

    try {
      await onFileSelect(file);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch {
      setSelectedFile(null);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await handleFile(files[0]);
    }
  };

  const handleClick = () => {
    if (!disabled && !uploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setUploadSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileRemove?.();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div 
      className={`file-upload-zone ${isDragging ? 'dragging' : ''} ${disabled || uploading ? 'disabled' : ''} ${selectedFile || currentFileName ? 'has-file' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="file-upload-input"
        disabled={disabled || uploading}
      />

      {uploading ? (
        <div className="file-upload-loading">
          <div className="upload-spinner"></div>
          <span>Uploading...</span>
        </div>
      ) : selectedFile ? (
        <div className="file-upload-preview">
          {uploadSuccess ? (
            <CheckCircle size={32} className="file-icon success" />
          ) : (
            <FileText size={32} className="file-icon" />
          )}
          <div className="file-info">
            <span className="file-name">{selectedFile.name}</span>
            <span className="file-size">{formatFileSize(selectedFile.size)}</span>
          </div>
          {!disabled && (
            <button className="file-remove-btn" onClick={handleRemove}>
              <X size={16} />
            </button>
          )}
        </div>
      ) : currentFileName ? (
        <div className="file-upload-preview">
          <FileText size={32} className="file-icon" />
          <div className="file-info">
            <span className="file-name">{currentFileName}</span>
            <span className="file-hint">Click or drag to replace</span>
          </div>
          {!disabled && onFileRemove && (
            <button className="file-remove-btn" onClick={handleRemove}>
              <X size={16} />
            </button>
          )}
        </div>
      ) : (
        <div className="file-upload-placeholder">
          <Upload size={32} className="upload-icon" />
          <div className="upload-text">
            <span className="upload-primary">Choose file or drag & drop</span>
            <span className="upload-secondary">PDF only, max 5MB</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
