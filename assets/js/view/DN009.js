app.controller('searchPlanCtrl', ['$scope', '$http', function($scope, $http) {
  function init() {
    $scope.collection_point_list = [];
    $scope.collection_point_list2 = [
      { start_date: '0A0900', LOCATION_NAME: 'ศูนย์บริการโลหิตแห่งชาติ 2' },
      { start_date: '0A0901', LOCATION_NAME: 'เนื่องในโอกาสพิเศษต่างๆ 2' },
      { start_date: '0A0902', LOCATION_NAME: 'เจ้าหน้าที่ศูนย์บริการโลหิตฯ 2' },
      { start_date: '0A0903', LOCATION_NAME: 'COLLECTION POINT TEST 2' }
    ];
    $scope.choice_checked = 'site';
    $scope.choice_checked2 = 'site';
    $scope.list_selected = {};
    $scope.transaction_item = {};
    $scope.selectedItem = {};

    $('.modal-trigger').leanModal();

    $(document).on("click", ".colitem", function(){
      $(".colitem").removeClass("yellow");
      $(this).toggleClass("yellow");
    });

    $(document).on("click", ".planitem", function(){
      $(".planitem").removeClass("yellow");
      $(this).toggleClass("yellow");
    });
  }

  $scope.searchCollectionPointList = function() {
    // console.log($scope.COLLECTION_POINT_CODE);
    $http({
      method: 'GET',
      url: 'http://192.168.0.145/api/collection_point/'
    }).then(function(response) {
      $scope.collection_point_list = response.data;
    });
  }

  $scope.search = function() {
    $http({
      method: 'GET', // อาจจะต้องใช้ POST
      url: 'http://192.168.0.145/api/donor_biological/lists/0000010195', // จะต้องเปลี่ยน path
      data: {

      }
    }).then(function(response) {
      if (response.data.length == 1 && $scope.COLLECTION_POINT_CODE.length == 6) {
        console.log('Link to Collection plan and send data', response.data[0]);
      } else {
        console.log('Show modal list data', response.data);
      }

      // $scope.collection_point_list2 = response.data;
    });
  }

  $scope.selectedRow = function(item) {
    $scope.transaction_item = item;
  }

  $scope.selectedRow2 = function(item) {
    $scope.selectedItem = item;
  }

  $scope.closeModal = function(condition) {
    if (condition) setSelected();
  }

  $scope.closeModal2 = function(condition) {
    if (condition) {
      console.log('Link to ...', $scope.selectedItem);
    }
  }

  $scope.showModal = function(id) {
    console.log(id);
    window.location.href = id;
  }

  function setSelected() {
    $scope.list_selected = $scope.transaction_item;
    $scope.COLLECTION_POINT_CODE = $scope.transaction_item.COLLECTION_POINT_CODE;
  }

  $scope.$watch('COLLECTION_POINT_CODE', function(newVal, oldVal) {
    $scope.collection_point_list.forEach(item => {
      if (item.COLLECTION_POINT_CODE == newVal) {
        $scope.selectedRow(item);
        setSelected()
      }
    });
  });

  init();
}]);
