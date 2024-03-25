run: 
	docker run -d -p 4000:4000 --name homelib homelib-img

start:
	docker start homelib
stop:
	docker stop homelib