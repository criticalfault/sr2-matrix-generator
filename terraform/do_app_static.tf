resource "digitalocean_app" "matrix-gen" {
  spec {
    name   = "matrix2-generator"
    region = "nyc"
    domain {
      name = "matrix2.nullsheen.com"
      type = "PRIMARY"
      zone = "nullsheen.com"
    }

    static_site {
      name          = "matrix-generator-sr2"
      build_command = "npm run build"
      output_dir    = "/build"

      git {
        repo_clone_url = "https://github.com/criticalfault/sr2-matrix-generator.git"
        branch         = "main"
      }
    }
  }
}