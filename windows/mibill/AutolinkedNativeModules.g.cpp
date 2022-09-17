// AutolinkedNativeModules.g.cpp contents generated by "react-native autolink-windows"
// clang-format off
#include "pch.h"
#include "AutolinkedNativeModules.g.h"

// Includes from @react-native-async-storage/async-storage
#include <winrt/ReactNativeAsyncStorage.h>

// Includes from react-native-camera
#include <winrt/ReactNativeCameraCPP.h>

// Includes from react-native-config
#include <winrt/RNCConfig.h>

// Includes from react-native-document-picker
#include <winrt/ReactNativeDocumentPicker.h>

// Includes from react-native-webview
#include <winrt/ReactNativeWebView.h>

namespace winrt::Microsoft::ReactNative
{

void RegisterAutolinkedNativeModulePackages(winrt::Windows::Foundation::Collections::IVector<winrt::Microsoft::ReactNative::IReactPackageProvider> const& packageProviders)
{ 
    // IReactPackageProviders from @react-native-async-storage/async-storage
    packageProviders.Append(winrt::ReactNativeAsyncStorage::ReactPackageProvider());
    // IReactPackageProviders from react-native-camera
    packageProviders.Append(winrt::ReactNativeCameraCPP::ReactPackageProvider());
    // IReactPackageProviders from react-native-config
    packageProviders.Append(winrt::RNCConfig::ReactPackageProvider());
    // IReactPackageProviders from react-native-document-picker
    packageProviders.Append(winrt::ReactNativeDocumentPicker::ReactPackageProvider());
    // IReactPackageProviders from react-native-webview
    packageProviders.Append(winrt::ReactNativeWebView::ReactPackageProvider());
}

}