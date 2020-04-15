describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should not add a new server to allServers on empty submitServerInfo()', function(){
    serverNameInput.value = '';
    submitServerInfo();
    expect(Object.keys(allServers).length).toEqual(0);
  });

  it('should update #serverTable on updateServerTable', () => {
    submitServerInfo();
    updateServerTable();

    let tds = document.querySelectorAll('#serverTable tbody tr td');
    expect(tds.length).toEqual(2);
  });

  afterEach(function() {
    serverTbody.innerHTML = '';
    allServers = {};
    serverId = 0;
  });
});
