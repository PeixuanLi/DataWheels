#!/usr/bin/python

import sys
from datetime import datetime
import json
import csv

class Point:
	def __init__(self,x,y):
		self.x = x
		self.y = y

class Polygon:
	def __init__(self,points):
		self.points = points
		self.nvert = len(points)

		minx = maxx = points[0].x
		miny = maxy = points[0].y
		for i in xrange(1,self.nvert):
			minx = min(minx,points[i].x)
			miny = min(miny,points[i].y)
			maxx = max(maxx,points[i].x)
			maxy = max(maxy,points[i].y)

		self.bound = (minx,miny,maxx,maxy)


	def contains(self,pt):
		firstX = self.points[0].x
		firstY = self.points[0].y
		testx = pt.x
		testy = pt.y
		if (testx<self.bound[0] or testy<self.bound[1] or testx>self.bound[2] or testy>self.bound[3]):
			return False
		c = False
		j = 0
		i = 1
		nvert = self.nvert
		while (i < nvert) :
			vi = self.points[i]
			vj = self.points[j]
			
			if(((vi.y > testy) != (vj.y > testy)) and (testx < (vj.x - vi.x) * (testy - vi.y) / (vj.y - vi.y) + vi.x)):
				c = not(c)

			if(vi.x == firstX and vi.y == firstY):
				i = i + 1
				if (i < nvert):
					vi = self.points[i];
					firstX = vi.x;
					firstY = vi.y;
			j = i
			i = i + 1
		return c

	def bounds(self):
		return self.bound


def importCsv(addr):
	print "import csv: begin"

	points = []
	count = 0
	with open(addr) as f:
	    for row in csv.reader(f.read().splitlines()):	
			if count >1 :
				pt1 = Point(float(row[3]),float(row[2]))
				points.append(pt1)
			count+=1
	f.close()

	return points





ret_dict = json.loads(s)
Staten_Island=[]
Queens=[]
Brooklyn=[]
Manhattan=[]
Bronx=[]
i=0

for p in ret_dict["features"][0]["geometry"]["coordinates"]:
	t=[]
	for q in p[0]:
		t.append(Point(q[0],q[1]))
	Staten_Island.append(t)

for p in ret_dict["features"][1]["geometry"]["coordinates"]:
	t=[]
	for q in p[0]:
		t.append(Point(q[0],q[1]))
	Queens.append(t)
for p in ret_dict["features"][2]["geometry"]["coordinates"]:
	t=[]
	for q in p[0]:
		t.append(Point(q[0],q[1]))
	Brooklyn.append(t)
for p in ret_dict["features"][3]["geometry"]["coordinates"]:
	t=[]
	for q in p[0]:
		t.append(Point(q[0],q[1]))
	Manhattan.append(t)
for p in ret_dict["features"][4]["geometry"]["coordinates"]:
	t=[]
	for q in p[0]:
		t.append(Point(q[0],q[1]))
	Bronx.append(t)
	


for i in range(len(Staten_Island)):
	Staten_Island[i]=Polygon(Staten_Island[i])

for i in range(len(Queens)):
	Queens[i]=Polygon(Queens[i])

for i in range(len(Brooklyn)):
	Brooklyn[i]=Polygon(Brooklyn[i])

for i in range(len(Manhattan)):
	Manhattan[i]=Polygon(Manhattan[i])

for i in range(len(Bronx)):
	Bronx[i]=Polygon(Bronx[i])








for line in sys.stdin:
	m = line.strip().split(",")

	if (len(m) > 1): 
		if (len(m) > 1) & (m[0]!="\"Date/Time\"") :

		#total_a = float(l[19])
			try:
				raw_pickup=m[0]
				raw_pickup=raw_pickup.strip(" \" ")
				pickup_longitude=m[2]
				pickup_latitude=m[1]
				
				p_date = datetime.strptime(raw_pickup, '%m/%d/%Y %H:%M:%S').strftime('%Y-%m-%d') # time to correct format
				
				pickup_longitude=float(pickup_longitude)
				pickup_latitude=float(pickup_latitude)
				point=Point(pickup_longitude,pickup_latitude)
				borough=''
				for i in Staten_Island:
					if i.contains(point):
						borough='Staten_Island'
						break;
				
				if borough=='':
					for i in Queens:
						if i.contains(point):
							borough='Queens'
							break;
				if borough=='':
					for i in Brooklyn:
						if i.contains(point):
							borough='Brooklyn'
							break;
				if borough=='':
					for i in Manhattan:
						if i.contains(point):
							borough='Manhattan'
							break;
				if borough=='':
					for i in Bronx:
						if i.contains(point):
							borough='Bronx'
							break;
						
				print "%s,%s\t%d" %(borough,p_date, 1  )
			except ValueError:
				continue
			

		
