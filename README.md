# Lolo's Place

## About

This is my personal webpage and portfolio site. It is a place for my writing, projects, and ideas, with a mix of creative work, technical experiments, and reflections on life and culture.

The site is organized into a few broad sections:

- Home: the landing page and featured content
- About: basic information about me and the site
- Projects: selected work, experiments, and technical projects
- Texts: essays, poems, and other written pieces
- Blog: updates, notes, and longer posts
- Tags: browsing content by topic or theme

## Dev Environment

This site is built with Jekyll and GitHub Pages. The development environment uses Ruby `3.4.11`, managed with rbenv, and Bundler `2.4.10`.

### One-time setup on Linux

Install Ruby and the native build dependencies:

```bash
sudo apt update
sudo apt install -y rbenv build-essential autoconf bison libssl-dev libyaml-dev \
	libreadline-dev zlib1g-dev libncurses5-dev libffi-dev libgdbm-dev libdb-dev
```

Update the Ruby version definitions used by rbenv:

```bash
mkdir -p "$(rbenv root)/plugins"
if [ -d "$(rbenv root)/plugins/ruby-build/.git" ]; then
	git -C "$(rbenv root)/plugins/ruby-build" pull
else
	git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)/plugins/ruby-build"
fi
```

Make sure rbenv is initialized by your shell. For the current shell, run:

```bash
eval "$(rbenv init -)"
```

To initialize rbenv automatically, add that command to your shell startup file, such as `~/.zshrc` or `~/.bashrc`.

### Install the project

From the repository root:

```bash
rbenv install -s 3.4.11
rbenv local 3.4.11
gem install bundler -v 2.4.10
rbenv rehash
bundle install
```

The `.ruby-version` file already selects Ruby `3.4.11` for this project. `bundle install` reads `Gemfile` and `Gemfile.lock` and installs the required Jekyll and GitHub Pages dependencies.

### Build and serve locally

Build the site once:

```bash
bundle exec jekyll build
```

Start the development server at <http://localhost:4000>:

```bash
bundle exec jekyll serve
```

No Node.js installation is required. Run `bundle exec` for Jekyll commands so the project uses its locked dependencies.