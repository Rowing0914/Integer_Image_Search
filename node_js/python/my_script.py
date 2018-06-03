import sys

def hello():
	message = sys.stdin.readlines()
	return message[0]

if __name__ == '__main__':
	print(hello())