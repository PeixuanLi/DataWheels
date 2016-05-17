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
		if (m[0]!="vendor_id"):

		#total_a = float(l[19])
			try:
				raw_pickup=m[1]

				p_date = datetime.strptime(raw_pickup, '%Y-%m-%d %H:%M:%S').strftime('%Y-%m-%d') # time to correct format

				print "%s\t%d" %( p_date, 1  )
			except ValueError:
				continue




