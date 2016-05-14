#!/usr/bin/python

import sys
from datetime import datetime
#import os
#lenth  fare_data = 11

# lenth trip data = 14
# 6 xiang 
# input comes from STDIN (stream data that goes to the program)
for line in sys.stdin:
	m = line.strip().split(",")

	if (len(m) > 1): 
		if (m[0]!="VendorID"):

		#total_a = float(l[19])
			try:
				trip_dis=float(m[10])
				if trip_dis<1:
					dis_ran = "0-1"
				elif (1<= trip_dis) & (trip_dis <2):
					dis_ran = "1-2"
				elif (2<= trip_dis) & (trip_dis <3):
					dis_ran = "2-3"
				elif (3<= trip_dis) & (trip_dis <4):
					dis_ran = "3-4"
				elif (4<= trip_dis) & (trip_dis <5):
					dis_ran = "4-5"
				elif (5<= trip_dis) & (trip_dis <6):
					dis_ran = "5-6"
				elif (6<= trip_dis) & (trip_dis <7):
					dis_ran = "6-7"
				elif (7<= trip_dis) & (trip_dis <8):
					dis_ran = "7-8"
				elif (8<= trip_dis) & (trip_dis <9):
					dis_ran = "8-9"

				elif 6<= trip_dis:
					dis_ran = ">10"
				else:
					dis_ran = "N/A"



				print "%s\t%d" %( dis_ran, 1  )
			except ValueError:
				continue




