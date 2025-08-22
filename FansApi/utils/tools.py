import datetime


def datetime_now(f="%Y-%m-%d %H:%M:%S"):
    return str(datetime.datetime.now().strftime(f))
