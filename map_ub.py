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

	if (len(m) > 1) & (m[0]!="\"Date/Time\"") :

		#total_a = float(l[19])
		raw_pickup=m[0]
		raw_pickup=raw_pickup.strip(" \" ")
		
		try:
			p_date = datetime.strptime(raw_pickup, '%m/%d/%Y %H:%M:%S').strftime('%Y-%m-%d') # time to correct format

			print "%s\t%d" %( p_date, 1  )
		except ValueError:
			continue
