terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
    }
  }
}

provider "google" {
  project = "qwiklabs-gcp-04-7023e18cd264" # Ganti dengan Project ID 
  region  = "us-west1" # Ganti dengan Region
}

resource "google_compute_instance" "e2_micro_instances" {
  count        = 2
  name         = "server-app-${count.index + 1}"
  machine_type = "e2-micro"
  zone         = "us-west1-a" # Ganti dengan Zone

  boot_disk {
    initialize_params {
      image = "ubuntu-2204-lts"
      type  = "pd-ssd"
    }
  }

  network_interface {
    network = "default"

    access_config {
    }
  }

  metadata_startup_script = <<-EOT
    #!/bin/bash
    apt-get update
    apt-get install -y nginx
    apt-get install -y github
  EOT

  tags = ["nginx-server"]

}

resource "google_compute_instance" "e2_highcpu_instance" {
  name         = "server-lb"
  machine_type = "e2-highcpu-4"
  zone         = "us-west1-a"

  boot_disk {
    initialize_params {
      image = "ubuntu-2204-lts"
      type  = "pd-ssd"
    }
  }

  network_interface {
    network = "default"

    access_config {
    }
  }

  metadata_startup_script = <<-EOT
    #!/bin/bash
    apt-get update
    apt-get install -y nginx
  EOT

  tags = ["nginx-server"]

}

resource "google_compute_instance" "e2_micro_instances_backup" {
  count        = 1
  name         = "server-backup-${count.index + 1}"
  machine_type = "e2-micro"
  zone         = "us-west1-b" # Ganti dengan Zone

  boot_disk {
    initialize_params {
      image = "ubuntu-2204-lts"
      type  = "pd-ssd"
    }
  }

  network_interface {
    network = "default"

    access_config {
    }
  }

  metadata_startup_script = <<-EOT
    #!/bin/bash
    apt-get update
    apt-get install -y nginx
    apt-get install -y github
  EOT

  tags = ["nginx-server"]

}
