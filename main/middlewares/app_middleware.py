import json

class RequestMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request.data_dict = self._extract_data(request)
        response = self.get_response(request)
        return response

    def _extract_data(self, request):
        if request.method == 'GET' and request.GET:
            return dict(request.GET)

        if request.method == 'POST':
            if request.content_type == 'application/json':
                try:
                    return json.loads(request.body)
                except json.JSONDecodeError:
                    return {}
            else:
                return dict(request.POST)

        return {}
