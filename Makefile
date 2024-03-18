.PHONY: run-server
run-server:
	cd backend && \
	make prepare-python && \
	make migration && \
	make run-django

.PHONY: run-client
run-client:
	cd frontend && \
	make prepare-npm && \
	make run-react
