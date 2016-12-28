# -*- coding: utf-8 -*-
"""
    计算前端埋点日生产量
    计算后端埋点日生产量
    计算埋点日生产量
    create eventV4DailyProductionEventsCount.json in same dir first time
    sample data:
    [
        {"date":"2016-12-25","app":234234, "backend": 23433, "total": 4355334},
        {"date":"2016-12-25","app":234234, "backend": 23433, "total": 4355334},
        {"date":"2016-12-25","app":234234, "backend": 23433, "total": 4355334}
    ]
"""

import pymongo
from pymongo import MongoClient
from datetime import datetime
import datetime
import json
from StringIO import StringIO
import time
from datetime import date
import calendar
import dateutil.parser

"""
    Part.1 database connector && generater date range
"""

db_host = MongoClient("10.8.8.111", 27017)
db_events_v4 = db_host["eventsV4"]
db_events_v4_collection = db_events_v4["eventV4"]

TODAY_DATE = datetime.datetime.now()
END_DATE = datetime.datetime(TODAY_DATE.year, TODAY_DATE.month, TODAY_DATE.day)
START_DATE = END_DATE - datetime.timedelta(days=1)

"""
    Part.2 mongo class

    count_docs_by_platform:
        start,end -> datetime.datetime()
        platform -> <app|landing|web|backend|client|share>

    count_docs:
        start,end -> datetime.datetime()
"""

class collection_util(object):
    def __init__(self, arg):
        self.collecion_instance = arg

    def count_docs_by_platform(self, start, end, platform):
        collecion = self.collecion_instance
        return collecion.count({
            "serverTime": {
                "$gte": start,
                "$lt": end
            },
            "platform": platform
        })

    def count_docs(self, start, end):
        collecion = self.collecion_instance
        return collecion.count({
            "serverTime": {
                "$gte": start,
                "$lt": end
            }
        })

    def count_event_by_key(sefl, start, end, event_name):
        collecion = self.collecion_instance
        return collecion.count({
            "serverTime": {
                "$gte": start,
                "$lt": end
            },
            "eventKey": event_name
        })

"""
    Part.3 mongo instance
"""

print("Mongo instance initial")
events_v4_instance = collection_util(db_events_v4_collection)
daily_production_event_count = events_v4_instance.count_docs(START_DATE, END_DATE)
daily_production_event_count_app = events_v4_instance.count_docs_by_platform(START_DATE, END_DATE, "app")
daily_production_event_count_backend = events_v4_instance.count_docs_by_platform(START_DATE, END_DATE, "backend")

this_day_dict = {
    "date": START_DATE.strftime("%Y-%m-%d"),
    "app": daily_production_event_count_app,
    "backend": daily_production_event_count_backend,
    "total": daily_production_event_count
}

print START_DATE, END_DATE
print this_day_dict

daily_production_logs = []
with open("./eventV4DailyProductionEventsCount.json", "r") as data_file:
    data = list(json.load(data_file))
    data.append(this_day_dict)
    daily_production_logs = data

with open("./eventV4DailyProductionEventsCount.json", "w") as outfile:
    json.dump(daily_production_logs, outfile)
