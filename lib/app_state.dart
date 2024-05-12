import 'package:flutter/material.dart';
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
  }

  void update(VoidCallback callback) {
    callback();
    notifyListeners();
  }

  late SharedPreferences prefs;

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

  bool _login = false;
  bool get login => _login;
  set login(bool value) {
    _login = value;
  }

  bool _logout = false;
  bool get logout => _logout;
  set logout(bool value) {
    _logout = value;
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
