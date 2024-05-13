import 'package:flutter/material.dart';
import 'package:q_r_checkin/index.dart';
import 'package:shared_preferences/shared_preferences.dart';

class FFAppState extends ChangeNotifier {
  static FFAppState _instance = FFAppState._internal();

  factory FFAppState() {
    return _instance;
  }

  FFAppState._internal();

  static void reset() {
    _instance = FFAppState._internal();
  }

  Future initializePersistedState() async {
    prefs = await SharedPreferences.getInstance();
    _safeInit(() {
      _StandardMode = prefs.getBool('ff_StandardMode') ?? _StandardMode;
    });
    _safeInit(() {
      _login = prefs.getBool('ff_login') ?? _login;
    });
    _safeInit(() {
      _logout = prefs.getBool('ff_logout') ?? _logout;
    });
  }

  void update(VoidCallback callback) {
    callback();
    notifyListeners();
  }

  late SharedPreferences prefs;

  String _ApiURL = "";
  String get ApiURL => _ApiURL;
  set ApiURL(String value) {
    _ApiURL = value;
  }

  Connection _connectionStatus = Connection.NULL;
  Connection get connectionStatus => _connectionStatus;
  set connectionStatus(Connection value) {
    _connectionStatus = value;
  }

  bool _DebugMode = false;
  bool get DebugMode => _DebugMode;
  set DebugMode(bool value) {
    _DebugMode = value;
  }

  bool _StandardMode = false;
  bool get StandardMode => _StandardMode;
  set StandardMode(bool value) {
    _StandardMode = value;
    prefs.setBool('ff_StandardMode', value);
  }

  String _passkey = '';
  String get passkey => _passkey;
  set passkey(String value) {
    _passkey = value;
  }

  bool _login = true;
  bool get login => _login;
  set login(bool value) {
    _login = value;
    prefs.setBool('ff_login', value);
  }
}

void _safeInit(Function() initializeField) {
  try {
    initializeField();
  } catch (_) {}
}

Future _safeInitAsync(Function() initializeField) async {
  try {
    await initializeField();
  } catch (_) {}
}
