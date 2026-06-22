# Orthanc + OHIF Viewer — Local DICOM Setup

## What this is

A fully Dockerized local DICOM viewing setup. Running one command starts everything:

```
docker compose up -d
```

Three containers:

- **Orthanc** — DICOM server. Stores and serves uploaded studies.
- **Nginx (orthanc-proxy)** — sits in front of Orthanc and adds CORS headers Orthanc doesn't reliably add on its own. Without this, the browser blocks OHIF's requests to Orthanc.
- **OHIF Viewer** — the web-based DICOM viewer, served from OHIF's official pre-built Docker Hub image (`ohif/app`). No Node.js, pnpm, or cloning the OHIF source repo required.

## Files included in this handover

```
dicom-new/
├── docker-compose.yml
├── orthanc/
│   └── orthanc.json
├── nginx/
│   └── nginx.conf
└── ohif/
    └── app-config.js
```

That's the entire setup. Copy this folder structure as-is.

## Prerequisites

- Docker Desktop installed and running.
- That's it. No Node.js or pnpm needed for this setup.

## Setup steps

From inside the `dicom-new` folder:

```
docker compose up -d
```

First run will pull three images (Orthanc, Nginx, OHIF) — this can take a minute or two depending on connection speed. Subsequent runs start almost instantly.

Verify all three containers are running:

```
docker ps
```

You should see `orthanc`, `orthanc-proxy`, and `ohif`, all `Up`.

## Uploading studies

Open the Orthanc Explorer UI:

```
http://localhost:9042
```

Use the upload feature there to add `.dcm` files.

## Viewing studies

Open OHIF:

```
http://localhost:3000
```

Uploaded studies should appear in the list. Click into one to view the images.

## Why the Nginx proxy is there

Orthanc has a built-in `HttpHeaders` config option meant to add CORS headers, but in this Docker image it doesn't reliably apply to the DICOMweb plugin's routes (`/dicom-web/...`), even when correctly set in `orthanc.json`. Browsers then block OHIF's requests with a CORS error even though Orthanc itself is working fine.

The fix is a small Nginx reverse proxy in front of Orthanc, on the port OHIF expects (`9042`), which adds CORS headers on every response before forwarding to Orthanc internally.

One detail that matters inside `nginx.conf`:

```
proxy_set_header Host $http_host;
```

This must be `$http_host`, not `$host`. Using `$host` strips the port number, which causes Orthanc to generate broken self-referential URLs (e.g. `http://localhost/...` instead of `http://localhost:9042/...`) for retrieving image data — the study list loads fine, but opening an image then fails.

## Data persistence

`docker-compose.yml` includes a named volume (`orthanc-storage`) mapped to Orthanc's internal database path. This is required — without it, all uploaded studies are lost if the Orthanc container is ever removed (`docker rm`), even if you keep the same `docker-compose.yml` and re-run `docker compose up`. Don't run `docker volume rm orthanc-storage` unless you intend to wipe all stored studies permanently.

## Changing OHIF's configuration

OHIF's settings (data source URLs, branding, extensions, etc.) live in `ohif/app-config.js`, which is mounted directly into the running container. To change a setting:

1. Edit `ohif/app-config.js`.
2. Restart just that container: `docker restart ohif`.

No rebuild needed — the file is read fresh on container start.

## Troubleshooting checklist

If OHIF shows "Data Source Connection Error" or "No studies available":

1. Check all three containers are running: `docker ps`.
2. Test Orthanc directly: `curl.exe -i http://localhost:9042/dicom-web/studies` — confirm `200 OK`, the `Access-Control-Allow-Origin` header is present, and the body lists studies (not `[]`, unless nothing's been uploaded yet).
3. If a container name conflict error appears on `docker compose up`, an old container with the same name wasn't cleaned up — run `docker rm -f <container-name>`, then `docker compose up -d` again.
4. If the study list loads but images won't open, check the retrieve URL field (`00081190`) in the QIDO response — if it's missing the port number (`http://localhost/...` instead of `http://localhost:9042/...`), check the `proxy_set_header Host` line in `nginx.conf` is `$http_host`, not `$host`, then run `docker restart orthanc-proxy`.
5. To stop everything cleanly without losing data: `docker compose down` (data persists in the named volume). To wipe everything including data: `docker compose down -v`.
