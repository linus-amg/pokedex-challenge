.PHONY: env-up
env-up: env-down
	docker-compose up -d --remove-orphans

.PHONY: env-down
env-down:
	docker-compose down -v

.PHONY: env
env:
	$(MAKE) env-up

.PHONY: env-build
env-build:
	docker-compose build --no-cache
