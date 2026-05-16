# Photobooth System

## 1. Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    users {
        bigint id PK
        string name
        string email
        string password
        string role
        datetime created_at
    }

    customers {
        bigint id PK
        string name
        string phone
        string email
        datetime created_at
    }

    templates {
        bigint id PK
        string name
        string type "photostrip/grid/video"
        string thumbnail
        string frame_file
        int total_slots
        string aspect_ratio
        boolean is_active
        datetime created_at
    }

    template_slots {
        bigint id PK
        bigint template_id FK
        int slot_number
        float x
        float y
        float width
        float height
        float rotation
    }
    
    templates ||--o{ template_slots : "has"

    sessions {
        bigint id PK
        bigint customer_id FK
        bigint template_id FK
        string session_code
        string mode "photo/video/gif"
        int total_capture
        int total_selected
        string status
        string final_file
        string qr_code
        datetime started_at
        datetime completed_at
    }

    customers ||--o{ sessions : "creates"
    templates ||--o{ sessions : "uses"

    photos {
        bigint id PK
        bigint session_id FK
        string file_path
        string thumbnail
        int capture_order
        boolean is_selected
        datetime created_at
    }
    sessions ||--o{ photos : "has"

    videos {
        bigint id PK
        bigint session_id FK
        string file_path
        float duration
        string type "raw/boomerang/final"
        datetime created_at
    }
    sessions ||--o{ videos : "has"

    gifs {
        bigint id PK
        bigint session_id FK
        string file_path
        float duration
        int total_frames
        datetime created_at
    }
    sessions ||--o{ gifs : "has"

    photo_edits {
        bigint id PK
        bigint photo_id FK
        bigint template_slot_id FK
        float scale
        float rotate
        float position_x
        float position_y
    }
    photos ||--o{ photo_edits : "has"
    template_slots ||--o{ photo_edits : "uses"

    prints {
        bigint id PK
        bigint session_id FK
        string printed_by
        string printer_name
        int total_print
        datetime printed_at
    }
    sessions ||--o{ prints : "has"

    downloads {
        bigint id PK
        bigint session_id FK
        string download_token
        datetime expired_at
        int total_download
    }
    sessions ||--o{ downloads : "has"

    devices {
        bigint id PK
        string name
        string type "camera/printer"
        string connection_type
        string status
        json metadata
    }
```

## 2. System Flow

### FLOW VIDEO BOOTH
1. User pilih Video Booth
2. Countdown
3. Record 5-10 detik
4. Masuk table `videos`
5. Apply overlay/template
6. Generate final mp4
7. QR Download

### FLOW BOOMERANG
1. Record 2 detik
2. Forward
3. Reverse
4. Loop
5. Export mp4/gif

### FLOW GIF EXPORT
1. Capture multiple frame
2. Gabungkan
3. Generate GIF
4. Save table `gifs`

## 3. Tech Stack
- **Frontend**: Nuxt
- **Backend**: Laravel
- **Camera Service**: Node.js
- **Image Processing**: Sharp
- **Video Processing**: FFmpeg
- **Realtime**: Laravel Reverb
- **Database**: Mysql
- **Storage**: MinIO / S3
