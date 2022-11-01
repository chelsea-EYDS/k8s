
export $(sed 's/=.*//' .env)
export PROJECT := $(or $(PROJECT), k8s)
export NAMESPACE := $(or $(NAMESPACE), chelsea)
export DOMAIN := $(or $(DOMAIN), chelsea.k8s.freshworks.club)
export REPO := $(or $(REPO), eydscasandbox.azurecr.io/chelsea)
export GIT_LOCAL_BRANCH?=$(shell git rev-parse --abbrev-ref HEAD)


build-local:
	@echo "+\n++ Make: Run/Build locally ...\n+"
	@docker-compose -f docker-compose-dev.yml up --build -d

run-local:
	@echo "+\n++ Make: Running locally ...\n+"
	@docker-compose -f docker-compose-dev.yml  up -d

build-client:
	@echo "+\n++ Make: Building Client ...\n+"
	@docker build --platform linux/amd64 -t eydscasandbox.azurecr.io/chelsea/client:latest ./client

build-api:
	@echo "+\n++ Make: Building Api ...\n+"
	@docker build --platform linux/amd64 -t eydscasandbox.azurecr.io/chelsea/api:latest ./api

build-nginx:
	@echo "+\n++ Make: Building Nginx ...\n+"
	@docker build --platform linux/amd64 -t eydscasandbox.azurecr.io/chelsea/nginx:latest ./nginx

local-client-logs:
	@docker logs $(PROJECT)-client --tail 25 --follow

local-api-logs:
	@docker logs $(PROJECT)-api --tail 25 --follow


local-nginx-logs:
	@docker logs $(PROJECT)-nginx --tail 25 --follow

local-auth-logs:
	@docker logs  auth --tail 25 --follow

local-db-logs:
	@docker logs  db --tail 25 --follow

local-db-workspace:
	@docker exec -it $(PROJECT)-db sh

local-api-workspace:
	@docker exec -it $(PROJECT)-api sh

local-client-workspace:
	@docker exec -it $(PROJECT)-client sh

local-nginx-workspace:
	@docker exec -it $(PROJECT)-nginx sh

close-local:
	@echo "+\n++ Make: Close Local ...\n+"
	@docker-compose -f docker-compose-dev.yml down -v --remove-orphans

close:
	@echo "+\n++ Make: Run/Close ...\n+"
	@docker-compose  down -v --remove-orphans

build-prod:
	@echo "+\n++ Make: Run/Build production ...\n+"
	@docker build --platform linux/amd64 -t $(REPO)/client:latest ./client
	@docker build --platform linux/amd64 -t $(REPO)/api:latest ./api
	@docker build --platform linux/amd64 -t $(REPO)/nginx:latest ./nginx

push-prod:
	@echo "+\n++ Make: Run/Push production ...\n+"
	@docker push $(REPO)/client:latest
	@docker push $(REPO)/api:latest
	@docker push $(REPO)/nginx:latest
