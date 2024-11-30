use std::collections::HashSet;

use exif::{In, Tag};
use tauri::{Emitter, Window};

fn get_directory_tree(window: Window, path: String) -> Result<Vec<String>, ()> {
    let mut image_paths = Vec::new();

    let image_extensions = ["jpg", "jpeg", "png", "tiff"];

    if let Ok(entries) = std::fs::read_dir(&path) {
        for entry in entries {
            if let Ok(entry) = entry {
                let file_path = entry.path();

                if file_path.is_file() {
                    if let Some(extension) = file_path.extension() {
                        if image_extensions.contains(&extension.to_string_lossy().to_lowercase().as_str()) {
                            if let Some(file_path_str) = file_path.to_str() {
                                window
                                    .emit("image-found", file_path_str)
                                    .unwrap_or_else(|e| eprintln!("Failed to emit image-found event: {}", e));

                                image_paths.push(file_path_str.to_string());
                            }
                        }
                    }
                } else if file_path.is_dir() {
                    if let Ok(mut sub_image_paths) = get_directory_tree(window.clone(), file_path.to_string_lossy().to_string()) {
                        image_paths.append(&mut sub_image_paths);
                    }
                }
            }
        }
    }

    Ok(image_paths)
}

#[tauri::command]
fn get_media_types(window: Window, path: String) -> Result<Vec<String>, ()> {
    let image_paths = get_directory_tree(window, path).unwrap();

    let mut model_set = HashSet::new();

    for image_path in image_paths {
        if let Ok(file) = std::fs::File::open(image_path) {
            if let Ok(reader) = exif::Reader::new().read_from_container(&mut std::io::BufReader::new(file)) {
                let model = reader.get_field(Tag::Model, In::PRIMARY).map(|field| field.display_value().to_string());

                if let Some(model) = model {
                    model_set.insert(model);
                }
            }
        }
    }

    Ok(model_set.into_iter().collect())
}

#[tauri::command]
fn organize_media(path: String) -> Result<(), ()> {
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![get_media_types, organize_media])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
