from app.models import AcquisitionItem
from app.modules.base_views import BaseListView, BaseView
from app.modules.example_data import ExampleAcquisitionItems
from app.serializers import AcquisitionItemSerializer
from app.views.common import api_func


class AcquisitionItemListView(BaseListView):
    _model = AcquisitionItem
    _serializer = AcquisitionItemSerializer
    _deserializer = AcquisitionItemSerializer

    @api_func('List acquisition items', url_tail='/acquisition-items',
              response=[ExampleAcquisitionItems.ITEM1.get(), ExampleAcquisitionItems.ITEM2.get()])
    def get(self):
        return self._get()

    @api_func('Create acquisition item', url_tail='/acquisition-items',
              request=ExampleAcquisitionItems.ITEM1.set(),
              response=ExampleAcquisitionItems.ITEM1.get(),
              status_codes={422: '{{ original }} / can not add one item twice'})
    def post(self):
        return self._post()


class AcquisitionItemView(BaseView):
    _model = AcquisitionItem
    _serializer = AcquisitionItemSerializer
    _deserializer = AcquisitionItemSerializer

    @api_func('Get acquisition item', item_name='acquisition item', url_tail='/acquisition-items/1',
              response=ExampleAcquisitionItems.ITEM1.get())
    def get(self, id: int):
        return self._get(id)

    @api_func('Update acquisition item', item_name='acquisition item', url_tail='/acquisition-items/1',
              request=ExampleAcquisitionItems.ITEM1.set(),
              response=ExampleAcquisitionItems.ITEM1.get(),
              status_codes={422: '{{ original }} / can not add one item twice'})
    def put(self, id: int):
        return self._put(id)

    @api_func('Delete acquisition item', item_name='acquisition item', url_tail='/acquisition-items/1',
              response=None)
    def delete(self, id: int):
        return self._delete(id)
